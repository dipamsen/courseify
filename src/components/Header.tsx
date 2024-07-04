import { AppBar, IconButton, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import BookIcon from "@mui/icons-material/Book";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          LinkComponent={Link}
          href="/"
        >
          <BookIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Courseify
        </Typography>
        <Button component={Link} to="/" color="inherit">
          List
        </Button>
        <Button component={Link} to="/new" color="inherit">
          Create
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
