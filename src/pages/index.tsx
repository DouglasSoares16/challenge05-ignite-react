import { Button, Box, Badge } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // eslint-disable-next-line consistent-return
    async ({ pageParam = null }) => {
      try {
        const response = await api.get('/api/images', {
          params: {
            after: pageParam,
          },
        });

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      getNextPageParam: lastPage => lastPage?.after || null,
    }
  );

  // eslint-disable-next-line consistent-return
  const formattedData = useMemo(() => {
    if (data !== undefined) {
      const formatted = data.pages
        .map(imageData => {
          return imageData.data;
        })
        .flat();

      return formatted;
    }
  }, [data]);

  /* if (isLoading && !isError) {
    return <Loading />;
  }

  if (!isLoading && isError) {
    return <Error />;
  } */

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
