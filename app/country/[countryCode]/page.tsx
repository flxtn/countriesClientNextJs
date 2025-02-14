"use client";

import { CountryInfo } from "@/types/countryTypes";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import NextImage from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  LineElement,
  PointElement,
} from "chart.js";

export default function CountryInfoPage() {
  const { countryCode } = useParams();
  const router = useRouter();

  const [countryDetails, setCountryDetails] = useState<CountryInfo>();
  const [isLoading, setIsLoading] = useState(true);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

  const populationData = {
    labels: countryDetails?.population.map((data) => data.year),
    datasets: [
      {
        label: "Population Over Time",
        data: countryDetails?.population.map((data) => data.value),
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
      },
    ],
  };

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/countries/${countryCode}`
        );
        setCountryDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchCountryDetails();
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
    <Container maxWidth="md" sx={{ paddingBottom: 3 }}>
      <Typography variant="h3" gutterBottom>
        {countryDetails?.name}
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <NextImage
          src={countryDetails?.flag || "/globe.svg"}
          alt={countryDetails?.name || "no image"}
          width={100}
          height={60}
        />
      </Box>
      <Typography variant="h5" mt={4}>
        Border Countries
      </Typography>
      <List>
        {countryDetails?.borderCountries.map((border, index) => (
          <Link
            key={index}
            href={`/country/${border.countryCode.replace(/\s+/g, "-")}`}
          >
            <ListItem>
              <ListItemText primary={border.officialName} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Typography variant="h5" mt={4}>
        Population Over Time
      </Typography>
      <Box>
        <Line data={populationData} />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/")}
        sx={{ marginTop: 4 }}
      >
        Back to List
      </Button>
    </Container>
  );
}
