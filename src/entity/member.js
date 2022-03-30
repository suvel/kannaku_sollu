import getUniquieId from "../functions/getUniqueId";

class Member {
  constructor(memName) {
    this.memName = memName;
  }
  getMember() {
    return {
      id: getUniquieId(),
      memName: this.memName,
    };
  }
}

export default Member;
