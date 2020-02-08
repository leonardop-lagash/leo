import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, CircularProgress } from "@material-ui/core";

import queryString from "query-string";

import { searchMovie } from "../../redux/actions/search";
import { movieResults, isSearchLoading } from "../../redux/selectors";
import MovieResults from "../../components/movieResults/movieResults";

export default ({ location }) => {
  const dispatch = useDispatch();
  const movies = useSelector(state => movieResults(state));
  console.log(movies);
  const isLoading = useSelector(state => isSearchLoading(state));
  const [isLooked, setIsLooked] = useState(false);

  useEffect(() => {
    const { movieName } = queryString.parse(location.search);

    if (movieName && !isLooked) {
      setIsLooked(true);
      dispatch(searchMovie({ movieName })); //request a la API
    }
  });

  const renderMovies = () => {
    if (movies) {
      return movies.map((value, index) => (
        <MovieResults key={index} {...value} />
      ));
    } else if (isLoading) {
      return <CircularProgress size={100} color='primary' />;
    }
    return <div></div>;
  };
  return <Container>{renderMovies()}</Container>;
};
