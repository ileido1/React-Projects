import { Button, Card, TextInput, Title, Badge } from "@tremor/react";

export function FormOfUser({ handleNameChange, handleEmailChange, handleGithubChange,handle,name, email, github, result, text }) {

  return (
    <Card style={{ marginTop: "10px" }}>
      <Title>{text}</Title>
      <form onSubmit={handle}>
        <TextInput
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <TextInput
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        <TextInput
          name="githubUser"
          placeholder="Github user"
          value={github}
          onChange={(e) => handleGithubChange(e.target.value)}
        />
        <Button>{text}</Button>
        <span>
          {result === "ok" && <Badge color="green">User Saved</Badge>}
          {result === "ko" && <Badge color="red">Error with fields</Badge>}
        </span>
      </form>
    </Card>
  );
}
