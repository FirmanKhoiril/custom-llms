import { Container } from "@mui/material";
import { Conversation, Form } from "../components";

const Home = () => {
  return (
    <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 1 }}>
      <Conversation />
      <Form />
    </Container>
  );
};

export default Home;
