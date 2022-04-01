import { Button, Paper, Typography, Box } from "@material-ui/core";
import { useOpenPage } from 'animated-router-react';
import { forwardRef } from "react";

export const ReceiveEmail = forwardRef<HTMLElement>((_, ref) => {
  const openPage = useOpenPage();

  return (
    <Paper ref={ref} elevation={10} style={{ margin: '10%' }}>
      <form noValidate autoComplete="off" style={{ padding: '5% 5% 3% 5%' }} >
        <Typography
          variant="h6" 
          component={"h2"}
          align="center"
        >On your email address was sent message with instructions how to reset our password.</Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="20px"
          style={{"marginTop": "25px"}}
        >
          <Button
            style={{ width: '120px', paddingTop: '10px' }}
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => openPage('/log-in', { updateHistory: true })}
          >Ok</Button>
        </Box>
      </form>
    </Paper>
  );
});