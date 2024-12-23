export class LendBook {
  user:number;

  constructor(data?: { user?: any; }) {
      data = data || {};
      this.user=data.user || []

  }
}
