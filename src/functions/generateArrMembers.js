import Member from "../entity/member";

const generateArrMembers = (memArr) => {
  let newMember = [];

  memArr.forEach((mem) => {
    const member = new Member(mem.memName);
    newMember.push(member.getMember());
  });

  return newMember;
};

export default generateArrMembers;
