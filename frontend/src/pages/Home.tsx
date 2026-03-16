import CommentForm from "../components/CommentForm";

import { CustomTypography } from "../materials/Typography";

export default function Home() {

  return (
    <>
      <CustomTypography variant="h1" gutterBottom>
          Aidan Wigmore
      </CustomTypography>
      <CustomTypography variant="body1" gutterBottom>
        Full-stack developer specializing in React and Django.
      </CustomTypography>
      <CommentForm />
    </>
  )
}