import { CaseDetails } from './case-details';

export class Draft {
  public static readonly DRAFT_QUERY_PARAM = 'draft';
  public static readonly DRAFT_PREFIX = 'DRAFT';

  id: string;
  document?: CaseDetails;
  type?: string;
  created?: string;
  updated?: string;

  public static stripDraftId (draftId: string): string {
    return draftId.slice(Draft.DRAFT_PREFIX.length);
  }

  public static isDraft (id: string): boolean {
    return String(id).startsWith(this.DRAFT_PREFIX);
  }
}
