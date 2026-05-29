import AuthTest from "@/widgets/auth-test";

export default function Home() {
  return <AuthTest routerType="app" callbackURL="/" />;
}
