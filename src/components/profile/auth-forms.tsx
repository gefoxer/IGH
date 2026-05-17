"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ru } from "@/lib/i18n/ru";

type AuthTab = "login" | "register";

export function AuthForms() {
  const [tab, setTab] = useState<AuthTab>("login");
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email: loginEmail.trim().toLowerCase(),
      password: loginPassword,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      toast.error(ru.auth.loginFailed);
      return;
    }

    toast.success(ru.auth.loginSuccess);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerPassword !== registerConfirm) {
      toast.error(ru.auth.passwordMismatch);
      return;
    }

    if (registerPassword.length < 6) {
      toast.error(ru.auth.passwordTooShort);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registerEmail.trim().toLowerCase(),
          username: registerUsername.trim(),
          password: registerPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "email_taken") toast.error(ru.auth.emailTaken);
        else if (data.error === "invalid_email") toast.error(ru.auth.invalidEmail);
        else toast.error(ru.auth.registerFailed);
        setLoading(false);
        return;
      }

      const signInResult = await signIn("credentials", {
        email: registerEmail.trim().toLowerCase(),
        password: registerPassword,
        redirect: false,
      });

      setLoading(false);

      if (signInResult?.error) {
        toast.success(ru.auth.registerSuccessLoginManual);
        setTab("login");
        return;
      }

      toast.success(ru.auth.registerSuccess);
    } catch {
      setLoading(false);
      toast.error(ru.auth.registerFailed);
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <div className="mb-4 flex rounded-lg border border-white/10 bg-white/5 p-1">
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-medium transition-colors",
                tab === t
                  ? "bg-accent text-white shadow"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "login" ? ru.auth.loginTab : ru.auth.registerTab}
            </button>
          ))}
        </div>
        <CardTitle className="font-display">
          {tab === "login" ? ru.auth.loginTitle : ru.auth.registerTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">{ru.auth.email}</Label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">{ru.auth.password}</Label>
              <Input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? ru.auth.loading : ru.auth.loginButton}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reg-email">{ru.auth.email}</Label>
              <Input
                id="reg-email"
                type="email"
                autoComplete="email"
                required
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-username">{ru.auth.username}</Label>
              <Input
                id="reg-username"
                autoComplete="username"
                required
                minLength={2}
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                placeholder={ru.profile.usernamePlaceholder}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password">{ru.auth.password}</Label>
              <Input
                id="reg-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-confirm">{ru.auth.confirmPassword}</Label>
              <Input
                id="reg-confirm"
                type="password"
                autoComplete="new-password"
                required
                value={registerConfirm}
                onChange={(e) => setRegisterConfirm(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? ru.auth.loading : ru.auth.registerButton}
            </Button>
            <p className="text-center text-xs text-muted-foreground">{ru.wallet.welcomeBonus}</p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
