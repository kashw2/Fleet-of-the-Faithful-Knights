import {Option} from 'funfix-core';
import * as moment from 'moment';

export class MomentUtils {

  static format(mnt: Option<moment.Moment>, format: 'DMY'): Option<string> {
    switch (format) {
      case 'DMY':
      default:
        return mnt.map(m => m.format('D/MM/YYYY'));
    }
  }

}