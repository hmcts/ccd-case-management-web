import { Jurisdiction } from '../../shared/domain/definition/jurisdiction.model';
import { Type } from 'class-transformer';

export class Profile {
  user: {
    idam: {
      id: number,
      email: string
      forename: string,
      surname: string,
      roles: string[]
    }
  };

  channels: string[];

  @Type(() => Jurisdiction)
  jurisdictions: Jurisdiction[];

  default: {
    workbasket: {
      jurisdiction_id: string,
      case_type_id: string,
      state_id: string
    }
  };

  isSolicitor(): boolean {
    return this.user.idam.roles.find(r => r.endsWith('-solicitor')) !== undefined;
  }
}
