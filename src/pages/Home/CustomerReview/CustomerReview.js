import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Rating,
} from "@mui/material";
// import { useTheme } from '@mui/material/styles';
import { Box } from "@mui/system";

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const url = `https://pure-castle-02044.herokuapp.com/home/reviews`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setReviews(result);
      });
  }, [reviews]);

  // console.log(reviews);

  return (
    <Container sx={{ mt: 20 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ borderBottom: "2px solid #6A0460" }}>
          Our Customer Says:{" "}
        </Typography>
      </Box>
      <Grid container spacing={1}>
        {reviews.map((review, index) => (
          <Grid key={review?._id} item xs={6} sm={6} md={4} lg={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: 3,
              }}
            >
              <Rating
                sx={{ mb: 2 }}
                name="read-only"
                value={parseInt(review?.rating)}
                readOnly
              />
              <Typography
                variant="body1"
                color="text.secondary"
                component="div"
              >
                {review?.review}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: "60px" }}
                  image={review?.imageUrl}
                  alt="Customer Image"
                  style={{ borderRadius: "50%" }}
                />

                <CardContent sx={{ textAlign: "left" }}>
                  <Typography component="div" variant="h6">
                    {review?.name}
                  </Typography>
                  <Typography component="div" variant="title1">
                    Customer
                  </Typography>
                  {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton aria-label="previous">

                                            </IconButton>
                                            <IconButton aria-label="play/pause">
                                            
                                            </IconButton>
                                            <IconButton aria-label="next">
                                            
                                            </IconButton>
                                        </Box> */}
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CustomerReview;
