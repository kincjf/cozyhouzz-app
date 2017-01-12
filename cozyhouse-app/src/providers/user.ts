export class User {
  public idx: number;
  public provider: string;
  public fullName: string;
  public email: string;
  public avatar: string;
  public businessName: string;
  public businessAddress: string;
  public cellPhone: string;
  public delimiter: number;
/*
 businessName : ['', Validators.required],
 businessAddress : ['', Validators.required],
 fullName: ['', Validators.required],
 email: ['', Validators.required],
 cellphone: ['', Validators.required],

 */
  userRef: any;

  constructor(public userDetail) {
    console.log(userDetail);
      this.idx = userDetail["user"]["idx"];
      this.email = userDetail["user"]["email"];
      this.delimiter =userDetail["user"]["memberType"];
      /*if(this.delimiter == 1) {
        this.businessName = snapshot.val().businessName;
        this.businessAddress = snapshot.val().businessAddress;
      }*/
  }

  // Wrap firebase update
  update(object: any) {
    console.debug("update user details " + this.constructor.name);
    return this.userRef.update(object);
  }

  // Verify if there is an avatar, if not assign a default one
  loadAvatar(avatarUrl) {
    return avatarUrl ? avatarUrl : 'assets/icon/no-avatar.png';
  }

  // Resolve provider ids
  getProvider(id) {
    var providerNames = [
      '',
      'Twitter',                //1
      'Facebook',               //2
      'GooglePlus',             //3
      'Firebase user/password', //4
      'Anonymous'               //5
    ];
    return providerNames[id];
  }
}
