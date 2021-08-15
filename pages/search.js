import { useRouter } from 'next/router';
import React from 'react';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';

function Search({ searchResults }) {
  const router = useRouter();
  const { searchLocation, guests } = router.query;

  return (
    <div className='max-h-screen'>
      <Header />
      <main className='flex'>
        <section className='flex-grow pt-14 px-6 overflow-y-scroll max-h-screen'>
          <p className='text-xs'>300+ Stays for {guests} guests</p>
          <h1 className='text-3xl font-semibold mt-2 nb-6'>
            Stays in {searchLocation}
          </h1>
          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            {/* make own button component */}
            <button type='button' className='button'>
              Cancellation Flexibility
            </button>
            <button type='button' className='button'>
              Type of Place
            </button>
          </div>
          <div>
            {searchResults.map(
              ({
                img,
                location,
                title,
                description,
                star,
                price,
                total,
                long,
                lat,
              }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                  long={long}
                  lat={lat}
                />
                // eslint-disable-next-line comma-dangle
              )
            )}
          </div>
        </section>
        <section className='lg:inline-flex lg:min-w-[40%]'>
          <Map searchResults={searchResults} />
        </section>
      </main>
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const result = await fetch('https://links.papareact.com/isz');
  const searchResults = await result.json();

  return {
    props: {
      searchResults,
    },
  };
}
