import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";

function MembersPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([
    { id: "self", name: "John Doe (You)", role: "OWNER", avatar: null, initial: "JD" },
    {
      id: "sarah",
      name: "Sarah Miller",
      role: "MEMBER",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDaHI0U_Jf-y2UwVHlBZttJBOK5uFz4FpyZUtgwEibPcH2kcEfb269BCsgQVpJGRK-y7zAm7j_2nG__AOBCKuoaIQTUFaaVjQqr9At9p8ov_6cCUcytpVJNg1FYFbqoir2IgN7rFfbeRRmDYkR1bvLVmzM7ReIfQBwQvrAROzRKUCcMI40D2tVsFRZoCfP3mwTN7jrEBDXIXaR-Nptq4FyHHjB9zJ1WjZOTQqFIJpQqMDKy6SNXkwNxInf-cpMAZN8BMy6GsoPYU1pf",
      initial: "SM",
    },
    { id: "marcus", name: "Marcus Wong", role: "MEMBER", avatar: null, initial: "MW" },
  ]);

  const removeMember = (id) => {
    if (id === "self") return;
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen pb-32 pt-24">
      <TopAppBar total="$0.00" />
      <main className="px-container-margin max-w-[768px] mx-auto">
        <div className="mb-section-margin">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-secondary-container text-on-secondary-container font-label-bold text-label-bold px-2 py-0.5 rounded-sm">
              STEP 2
            </span>
            <h2 className="font-headline-md text-headline-md">Manage Members</h2>
          </div>
          <p className="text-on-surface-variant font-body-md">
            Add the participants who will be splitting the ledger costs.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-inline-gap mb-section-margin">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding flex flex-col items-center relative shadow-sm"
            >
              <div
                className={`w-12 h-12 rounded-full ${
                  member.avatar
                    ? "bg-surface-container-highest overflow-hidden"
                    : "bg-secondary-fixed text-on-secondary-fixed"
                } flex items-center justify-center font-headline-md mb-3`}
              >
                {member.avatar ? (
                  <img className="w-full h-full object-cover" src={member.avatar} alt={member.name} />
                ) : (
                  member.initial
                )}
              </div>
              <p className="font-label-bold text-label-bold text-primary mb-1 text-center">
                {member.name}
              </p>
              <p className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-widest">
                {member.role}
              </p>
              <div className="mt-4 pt-3 border-t border-dashed border-outline-variant w-full text-center">
                <button
                  onClick={() => removeMember(member.id)}
                  className={`font-label-bold text-label-bold ${
                    member.id === "self"
                      ? "text-on-surface-variant opacity-30 cursor-not-allowed"
                      : "text-error hover:underline transition-all"
                  }`}
                  disabled={member.id === "self"}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
          <button className="dashed-border bg-transparent p-card-padding flex flex-col items-center justify-center group hover:bg-secondary-container/10 transition-colors">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center mb-3 group-hover:border-secondary group-hover:text-secondary text-outline-variant transition-colors">
              <span className="material-symbols-outlined text-2xl">person_add</span>
            </div>
            <p className="font-label-bold text-label-bold text-on-surface-variant group-hover:text-secondary transition-colors">
              ADD MEMBER
            </p>
          </button>
        </div>

        <div className="bg-surface-container-low rounded-xl p-card-padding border border-outline-variant border-dashed">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary">info</span>
            <div>
              <h4 className="font-label-bold text-label-bold text-primary mb-1">SYSTEM NOTE</h4>
              <p className="text-body-md text-on-surface-variant">
                Adding members allows you to assign specific line items to individuals or groups
                during the 'Split' phase.
              </p>
            </div>
          </div>
        </div>
      </main>
      <button
        onClick={() => navigate("/split")}
        className="fixed bottom-24 right-4 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform z-40"
      >
        <span className="material-symbols-outlined text-2xl">arrow_forward</span>
      </button>
      <BottomNavBar />
    </div>
  );
}

export default MembersPage;
