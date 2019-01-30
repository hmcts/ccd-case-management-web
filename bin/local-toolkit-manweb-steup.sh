#!/bin/sh

WORKSPACE_ROOT=".toolkit-workspace"
MANWEB="ccd-case-management-web"
TOOLKIT="ccd-case-ui-toolkit"

if [ "$1" = "--help" ] ; then
	echo "This script will checkout 2 fresh local copies of ccd-case-management-web & ccd-case-ui-toolkit, build them both, copy the relevant files across to ccd-case-management-web then run the project"
	echo "use flags -t & -m to set the toolkit and management-web branches respectively. If either flag not used the master branch will be used as default"
	echo "eg: sh local-toolkit-setup.sh -m RDM-my-management-web-branch -t RDM-my-toolkit-branch"
	exit 0
fi

while getopts t:m:h: option
do
case "${option}"
in
t) TOOLKITBRANCH=${OPTARG};;
m) MANWEBBRANCH=${OPTARG};;
h) ;;
esac
done

function project_config() {
    project=$1
    config=$2
    case $project in
        ccd-case-ui-toolkit)
            repository="git@github.com:hmcts/ccd-case-ui-toolkit.git"
            tagEnv="CCD_API_GATEWAY_TAG"
            ;;
        ccd-case-management-web)
            repository="git@github.com:hmcts/ccd-case-management-web.git"
            tagEnv="CCD_CASE_MANAGEMENT_WEB_TAG"
            ;;
        *)
            echo "Project must be one of: cd-case-ui-toolkit, ccd-case-management-web"
            exit 1 ;;
    esac
    case $config in
        tagEnv)
            echo $tagEnv
            ;;
        repository)
            echo $repository
            ;;
        buildCommand)
            echo $buildCommand
            ;;
        *)
            echo "Config is one of repository, tagEnv or buildCommand. '$config' is unkown"
            exit 1
            ;;
    esac
}

function workspace_dir() {
    project=$1
    workspace="$WORKSPACE_ROOT/$project"
    echo $workspace
}

function git_clone() {
    project=$1
    branch=$2
    if [ -n "$branch" ]; then
        branch_option="--branch $branch"
    fi
    workspace=$(workspace_dir $project)
    repository=$(project_config $project repository)
    rm -rf $workspace
    echo 'creating workspace..'
    mkdir -p $workspace
    echo 'cloning project..'
    result=$(git clone --depth=20 --no-tags $branch_option $repository $workspace 2>&1 || exit $?)
    exitcode=$?
    echo $result | egrep -q "Remote branch .* not found in upstream origin"
    no_branch=$?
    if [ $no_branch -eq 0 ]; then
        echo
        echo "$project does not contain the branch '$branch'"
        exit $exitcode
    fi
    echo 'clone complete'
}


function setup_toolkit() {
	git_clone $TOOLKIT $TOOLKITBRANCH
	echo "building ccd-case-ui-toolkit.."
	(cd $workspace && yarn --ignore-engines install && yarn build)
}

function setup_manweb {
	git_clone $MANWEB $MANWEBBRANCH
	echo "building ccd-case-management-web.."
	(cd $workspace && yarn --ignore-engines install)
	echo "removing dist folder in ccd-case-management-web.."
	rm -rf $(workspace_dir $MANWEB)/node_modules/\@hmcts/ccd-case-ui-toolkit/dist
	echo "copying dist folder from ccd-case-ui-toolkit => ccd-case-management-web"
	cp -r $(workspace_dir $TOOLKIT)/dist $(workspace_dir $MANWEB)/node_modules/\@hmcts/ccd-case-ui-toolkit/
	echo "starting ccd-case-management-web.."
	(cd $workspace && yarn start)
}

function entrypoint {

	if [[ "$TOOLKITBRANCH" ]]; then
		echo "CCD-CASE-UI-TOOLKIT: using branch \"$TOOLKITBRANCH\""
	else 
		TOOLKITBRANCH='master'
		echo "CCD-CASE-UI-TOOLKIT: using default branch Master"

	fi

	if [[ "$MANWEBBRANCH" ]]; then
		echo "CCD-CASE-MANAGEMENT-WEB: using branch \"$MANWEBBRANCH\""
	else
		MANWEBBRANCH='master'
		echo "CCD-CASE-MANAGEMENT-WEB: using default branch Master"
	fi

	setup_toolkit
	setup_manweb

}

entrypoint





