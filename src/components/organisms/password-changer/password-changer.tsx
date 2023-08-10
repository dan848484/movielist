import { useContext, useState } from "react";
import { NewPasswordForm } from "../../moleculs/new-password-form/new-password-form";
import style from "./password-changer.module.css";
import { AuthClientContext } from "../../../providers/auth-client.provider";
import { AuthClient } from "../../../auth-client/authClient";
import { OldPasswordForm } from "../../moleculs/old-password-form/old-password-form";
type ViewMode = "old-password" | "new-password" | "complete";
export const PasswordChanger = () => {
  const authClient = useContext(AuthClientContext);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("old-password");
  const [oldPassword, setOldPassword] = useState<string | undefined>(undefined);
  const onOldPasswordInputed = (oldPassword: string) => {
    setOldPassword(oldPassword);
    setViewMode("new-password");
  };
  const changePassword = async (newPassword: string) => {
    if (isLoading || !oldPassword) return;
    setIsLoading(true);
    try {
      if (!authClient) {
        alert("authClientを取得できませんでした");
        return;
      }
      await authClient!.changePassword(oldPassword, newPassword);
      console.log("完了しました");
    } catch (error) {
      console.log(error);
      alert("失敗しました");
    }
  };

  const view = (mode: ViewMode) => {
    switch (mode) {
      case "old-password":
        return (
          <OldPasswordForm onConfirm={onOldPasswordInputed}></OldPasswordForm>
        );
      case "new-password":
        return (
          <NewPasswordForm
            onConfirmed={changePassword}
            isLoading={isLoading}
          ></NewPasswordForm>
        );
      default:
        return <></>;
    }
  };
  return (
    <div className={style.container}>
      <div className={style.formWrapper}>{view(viewMode)}</div>
    </div>
  );
};
