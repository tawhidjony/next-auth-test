import { AbsoluteCenter, Button, Flex, Heading } from "@chakra-ui/react";
import {
  CtxOrReq,
  getCsrfToken,
  signIn,
  signOut,
  useSession,
} from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import BaseLayout from "../components/BaseLayout";

export default function SignIn({ csrfToken }: any) {
  const router = useRouter();
  const [session, loading] = useSession();
  const [isOpened, setOpened] = useState(false);
  const [isClosed, setClosed] = useState(false);
  console.log(session);
  useEffect(() => {
    if (isClosed) window.location.replace("/dashboard");
    if (session !== undefined) window.location.replace("/");
  }, [isClosed, router, session]);

  return (
    <BaseLayout pageTitle={"Login"}>
      <AbsoluteCenter alignItems="center">
        <Flex justifyContent="center" alignItems={"center"} direction="column">
          <Heading>You must login with Discord to continue</Heading>
          <form
            method="POST"
            action="/api/auth/signin/discord"
            target="result"
            id="signInFORM"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <input name="callbackUrl" type="hidden" defaultValue="/close" />
          </form>
          <Button
            my={5}
            color="white"
            bg="#5966f2"
            _hover={{
              bg: "#2c3bed",
            }}
            leftIcon={<FaDiscord />}
            isLoading={isOpened}
            loadingText="Waiting for Authorization..."
            onClick={() => signIn()}
          >
            Login with Discord
          </Button>
        </Flex>
      </AbsoluteCenter>
    </BaseLayout>
  );
}

export async function getServerSideProps(context: CtxOrReq | undefined) {
  const csrfToken = await getCsrfToken(context);
  console.log("csrfToken", csrfToken);

  // const data = await csrfToken.json()
  if (csrfToken) {
    return {
      props: { csrfToken },
    };
  } else {
    return {
      props: {},
    };
  }
}
