import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../Common/edit";
import { useDeleteUser } from "../../Services/services";
import "./AccountDelete.scss";

export default function AccountDelete({ user }) {
  const deleteUserMutation = useDeleteUser();
  const navigate = useNavigate();
  function accountDelete(uid) {
    deleteAccount(user);
    deleteUserMutation.mutate(uid);
    navigate("/auth");
  }
  return (
    <div className="accountDelete" onClick={(e)=>e.stopPropagation()}>
      <h1 className="accountDelete__title">Account Deletion</h1>
      <span className="accountDelete__subtitle">
        Please be advised that deleting your account is a permanent action. Once
        your account is deleted, it cannot be restored.
      </span>
      <button onClick={accountDelete(user.uid)}>Delete my account</button>
    </div>
  );
}
