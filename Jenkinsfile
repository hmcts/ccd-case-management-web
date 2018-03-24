#!groovy

properties(
    [[$class: 'GithubProjectProperty', projectUrlStr: 'https://github.com/hmcts/ccd-case-management-web/'],
     pipelineTriggers([[$class: 'GitHubPushTrigger']]),
   [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '7', numToKeepStr: '10']]
]
)

@Library('Reform')
import uk.gov.hmcts.Ansible
import uk.gov.hmcts.Packager
import uk.gov.hmcts.RPMTagger

ansible = new Ansible(this, 'ccdata')
packager = new Packager(this, 'ccdata')
env.TEST_BROWSER = "ChromiumHeadless"

milestone()
lock(resource: "case-management-web-${env.BRANCH_NAME}", inversePrecedence: true) {
    node {
        try {
            wrap([$class: 'AnsiColorBuildWrapper', colorMapName: 'xterm']) {
                stage('Checkout') {
                    deleteDir()
                    checkout scm
                }

                stage('Setup (install only)') {
                    sh "yarn install --non-interactive"
                }

                stage('Lint') {
                    sh "yarn run lint"
                }

                stage('Node security check') {
                    sh "yarn test:nsp"
                }

                stage('Test') {
                    sh "yarn test"
                }

                stage('Sonar analysis') {
                    sh "yarn sonar-scanner"
                }

                onDevelop {
                    publishAndDeploy('develop', 'dev')
                }

                onMaster {
                    publishAndDeploy('master', 'test')
                }

                milestone()
            }
        } catch (err) {
            notifyBuildFailure channel: '#ccd-notifications'
            throw err
        }
    }
}

def publishAndDeploy(branch, env) {
    def rpmVersion
    def version
    def caseManagementVersion

    stage('Package application (RPM)') {
        rpmVersion = packager.nodeRPM('case-management-web')
    }

    stage('Publish RPM') {
        packager.publishNodeRPM('case-management-web')
    }

    stage('Package (Docker)') {
        caseManagementVersion = dockerImage imageName: 'ccd/ccd-case-management-web', tags: [branch]
    }

    def rpmTagger = new RPMTagger(
        this,
        'case-management-web',
        packager.rpmName('case-management-web', rpmVersion),
        'ccdata-local'
    )

    stage('Deploy: ' + env) {
        version = "{case_management_web_version: ${rpmVersion}}"
        ansible.runDeployPlaybook(version, env, branch)
        rpmTagger.tagDeploymentSuccessfulOn(env)
    }

    stage("Smoke Tests: " + env) {
        sh "curl -vf https://case-worker-web." + env + ".ccd.reform.hmcts.net/health.json"
        rpmTagger.tagTestingPassedOn(env)
    }
}
