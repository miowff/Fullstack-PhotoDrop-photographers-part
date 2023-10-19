import { Container } from "@/globalStyle";
import headerLogo from "./assets/photoDropLogo.svg";
import { HeaderContent, LogOutButton, Logo } from "./HeaderStyles";
import { useLocation } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "@/enums/authTokenKey";
import { useNavigate } from "react-router-dom";
function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const shouldRenderLogoutButton = pathname !== "/login";

  const handleLogOut = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate("/login");
  };
  return (
    <Container>
      <HeaderContent>
        <Logo
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <img src={headerLogo} alt="Logo"></img>
        </Logo>
      </HeaderContent>
      {shouldRenderLogoutButton && (
        <LogOutButton onClick={handleLogOut}>Log out</LogOutButton>
      )}
    </Container>
  );
}
export default Header;
