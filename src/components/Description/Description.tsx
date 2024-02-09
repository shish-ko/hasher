import { Typography } from "@mui/material";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";

export const Description = () => {
  return (
    <AppBlock>
      <Typography variant="h3" color={"white"}>Why Choose SecretService?</Typography>
      <Typography sx={{display: 'inline-block', width: '49%'}} color='text.secondary'>Have you ever wished for a place on the web where
        your secret files could take a nap until called upon?
        That’s Us! We’re like that trustworthy friend who’d
        never spill your beans. Go ahead, make use of our
        exclusive timed-release feature; your files won’t budge
        till the clock ticks zero.</Typography>
      <Typography sx={{display: 'inline-block', width: '49%', marginLeft: '2%'}} color='text.secondary'>With a sophisticated, password-protected
        authentication system and eagle-eyed 24/7
        surveillance, we’ve got your back. You’ll be entrusting
        your files to our top-secret, impenetrable cloud
        fortress. All this comes wrapped in a sleek, easy-to-
        use interface, bathed in a soothing dark palette.</Typography>
    </AppBlock>
  );
};
