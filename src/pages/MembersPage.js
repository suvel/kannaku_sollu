import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";
import AddMemberModal from "../components/AddMemberModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { useMembers } from "../context/MembersContext";
import { useLedger } from "../context/LedgerContext";
import { getMemberLedgerItems, getGrandTotal } from "../utils/ledgerSummary";
import { CURRENCY_SYMBOL, ROUTES, SELF_MEMBER_ID } from "../constants";

function MembersPage() {
  const navigate = useNavigate();
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [memberPendingRemoval, setMemberPendingRemoval] = useState(null);
  const { members, addMember: addMemberToContext, removeMember } = useMembers();
  const { ledgerItems, removeLedgerItemsByMember } = useLedger();

  const addMember = ({ name }) => {
    addMemberToContext({ name });
    setIsAddMemberOpen(false);
  };

  const cancelRemoveMember = () => setMemberPendingRemoval(null);

  const confirmRemoveMember = () => {
    if (!memberPendingRemoval) return;
    removeLedgerItemsByMember(memberPendingRemoval.id);
    removeMember(memberPendingRemoval.id);
    setMemberPendingRemoval(null);
  };

  const affectedMemberEntryCount = memberPendingRemoval
    ? getMemberLedgerItems(ledgerItems, memberPendingRemoval.id).length
    : 0;

  return (
    <div className="min-h-screen pb-32 pt-24">
      <TopAppBar total={`${CURRENCY_SYMBOL}${getGrandTotal(ledgerItems).toFixed(2)}`} />
      <main className="px-container-margin max-w-[768px] mx-auto">
        <div className="mb-section-margin">
          <div>
            <p className="font-label-bold text-label-bold text-secondary uppercase tracking-widest">
              Step 02
            </p>
            <h1 className="font-headline-lg text-headline-lg">Manage Members</h1>
          </div>
          <p className="text-on-surface-variant font-body-md">
            Add the participants who will be splitting the ledger costs.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-inline-gap mb-section-margin">
          {members.map((member) => (
            <div
              key={member.id}
              data-testid={`member-card-${member.id}`}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding flex flex-col items-center relative shadow-sm"
            >
              <div
                className={`w-12 h-12 rounded-full ${member.avatar
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
              <div className="mt-4 pt-3 border-t border-dashed border-outline-variant w-full text-center">
                <button
                  onClick={() => setMemberPendingRemoval(member)}
                  data-testid={`remove-member-${member.id}`}
                  className={`font-label-bold text-label-bold ${member.id === SELF_MEMBER_ID
                      ? "text-on-surface-variant opacity-30 cursor-not-allowed"
                      : "text-error hover:underline transition-all"
                    }`}
                  disabled={member.id === SELF_MEMBER_ID}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => setIsAddMemberOpen(true)}
            data-testid="add-member-button"
            className="dashed-border bg-transparent p-card-padding flex flex-col items-center group hover:bg-secondary-container/10 transition-colors justify-center"
          >
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center mb-3 group-hover:border-secondary group-hover:text-secondary text-outline-variant transition-colors">
              <span className="material-symbols-outlined text-2xl">person_add</span>
            </div>
            <p className="font-label-bold text-label-bold text-on-surface-variant group-hover:text-secondary transition-colors">
              ADD MEMBER
            </p>
          </button>
        </div>
      </main>
      <button
        onClick={() => navigate(ROUTES.SPLIT)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform z-40"
      >
        <span className="material-symbols-outlined text-2xl">arrow_forward</span>
      </button>
      <AddMemberModal
        open={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAdd={addMember}
      />
      <ConfirmDialog
        open={memberPendingRemoval !== null}
        title={memberPendingRemoval ? `Remove ${memberPendingRemoval.name}?` : ""}
        message={
          memberPendingRemoval
            ? affectedMemberEntryCount === 0
              ? "Are you sure you want to remove this member?"
              : `This will permanently delete ${affectedMemberEntryCount} ledger ${
                  affectedMemberEntryCount === 1 ? "entry" : "entries"
                } assigned to this member. This cannot be undone.`
            : ""
        }
        onConfirm={confirmRemoveMember}
        onClose={cancelRemoveMember}
      />
      <BottomNavBar />
    </div>
  );
}

export default MembersPage;
