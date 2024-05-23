import React from "react";

import { Center, Box, TextInput, Group, Button, Text, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "../hooks/auth";
import { Link } from "react-router-dom";

export const Auth = ({ isLogin }) => {
  const { login, register } = useAuth();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: isLogin
      ? {
          username: "",
          password: "",
        }
      : {
          email: "",
          username: "",
          password: "",
        },
  });

  const handleSubmit = (values) => {
    if (isLogin) {
      login(values.username, values.password);
    } else {
      register(values.username, values.email, values.password);
    }
  };

  return (
    <Center w={"100%"} h={"100vh"}>
      <Paper miw={450} mx="auto" px={100} py={30} bg="#363535" radius={20} shadow="xl">
        <Text size="35px" fw={900} ta={"center"} mb={20}>
          listenGo
        </Text>
        <Text fw={900} ta={"center"}>
          {isLogin ? "Login" : "Register"}
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {!isLogin && (
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          )}
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Your username"
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <TextInput
            withAsterisk
            label="Password"
            type="password"
            placeholder="Your password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Group justify="space-between" mt="md">
            <Button type="submit" fullWidth>
              Submit
            </Button>
            <Button
              variant="outline"
              component={Link}
              to={isLogin ? "/register" : "/login"}
              fullWidth
            >
              {isLogin ? "Register" : "Login"}
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
};
