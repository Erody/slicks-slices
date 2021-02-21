import { useEffect, useState } from 'react';

const gql = String.raw;

const details = `
	name
	_id
	image {
		asset {
			url
			metadata {
				lqip
			}
		}
	}
`;

export default function useLatestData() {
    // hot slices
    const [hotSlices, setHotSlices] = useState();
    // slicemasters
    const [slicemasters, setSlicemasters] = useState();
    // use a side effect to fetch the data from the grapgql endpoint
    useEffect(function () {
        // when the component loads, fetch the data
        fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: gql`
                    query {
                        StoreSettings(id: "downtown") {
                            name
                            slicemasters {
                                ${details}
                            }
                            hotSlices {
                                ${details}
                            }
                        }
                    }
                `,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                // TODO: check for errors
                // set the data to state
                setHotSlices(res.data.StoreSettings.hotSlices);
                setSlicemasters(res.data.StoreSettings.slicemasters);
            })
            .catch((err) => {
                console.log('Something went wrong');
                console.log(err);
            });
    }, []);
    return {
        hotSlices,
        slicemasters,
    };
}
