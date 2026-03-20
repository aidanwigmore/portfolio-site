import { CustomTypography } from "../materials/Typography";
import Videos from "./Videos/Videos";
import Projects from "./Projects/Projects";
import { CustomDivider } from "../materials/Divider";

export default function Home() {

  return (
    <>
      <CustomTypography variant="h1" textAlign="center" gutterBottom>
          Aidan Wigmore
          <CustomTypography variant="body1" textAlign="center" gutterBottom>
            Full-stack developer specializing in React and Django.
          </CustomTypography>
      </CustomTypography>
      <CustomDivider/>
      <CustomTypography variant="h2" textAlign="center"  gutterBottom>
        Projects I've Worked On
      </CustomTypography>
      <Projects/>
      <CustomDivider/>
      <CustomTypography variant="h2" textAlign="center" gutterBottom>
        Videos I've Made
      </CustomTypography>
      <Videos/>
    </>
  )
}