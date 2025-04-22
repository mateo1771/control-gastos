import styled from "styled-components";
import { useAuthStore, UserAuth } from "../index";
export function Home() {
  const { SignOut } = useAuthStore();
  const { user } = UserAuth();
  return (
    <Container>
      <h1>Bienvenido {user.full_name}</h1>
      <img src={user.picture} />
      <button onClick={SignOut}> Cerrar</button>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  color: ${(props) => props.theme.text};
`;
