import { Migration } from '@mikro-orm/migrations';

export class Migration20210123070427 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "email" text not null;');

    this.addSql('alter table "user" drop constraint "user_username_unique";');
  }

}
