"use client";

import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Country {
  name: string;
  countryCode: string;
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/countries/available`
        );
        setCountries(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        Countries
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {countries?.map((country, index) => (
            <Link
              key={index}
              href={`/country/${country.countryCode.replace(/\s+/g, "-")}`}
            >
              <ListItem
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    cursor: "pointer",
                  },
                }}
              >
                <ListItemText primary={country.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
