"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Column, Heading, Text } from "@once-ui-system/core";

export default function NotFound() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Trigger redirect in a separate effect to avoid side-effects inside setState updater
  useEffect(() => {
    if (seconds === 0) {
      router.replace("/");
    }
  }, [seconds, router]);

  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        Page Not Found
      </Heading>
      <Text onBackground="neutral-weak" align="center">
        The page you are looking for does not exist.
        <br />
        I only have 1 page — redirecting you in {seconds}s.
      </Text>
    </Column>
  );
}
