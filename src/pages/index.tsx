import { Button, Box } from '@chakra-ui/react';
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
    // TODO AXIOS REQUEST WITH PARAM
    async ({ pageParam = null }) => {
      const response = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });

      return response.data;
    },
    {
      // TODO GET AND RETURN NEXT PAGE PARAM
      getNextPageParam: lastPage => lastPage?.after || null,
    }
  );

  console.log(data);

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const pages = data?.pages.map(page => {
      return page.data;
    });

    const formatting = pages?.flat().map(image => {
      return image;
    });

    return formatting;
  }, [data]);

  // TODO RENDER LOADING SCREEN]
  /* if (isLoading && !isError) {
    return <Loading />;
  } */

  // TODO RENDER ERROR SCREEN
  /* if (!isLoading && isError) {
    return <Error />;
  } */

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList
          cards={[
            {
              title: 'Mine',
              description: 'My house in Minecraft',
              url: 'https://thearchitecturedesigns.com/wp-content/uploads/2021/02/mincraft-house-8-759x500.jpg',
              ts: 543463456345,
              id: '1',
            },
          ]}
        />
        <Button type="button" mt="8">
          Carregar mais
        </Button>
      </Box>
    </>
  );
}
