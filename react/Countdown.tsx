import React, { useState } from "react";
import { TimeSplit } from "./typings/global";
import { tick } from "./utils/time";

import { useCssHandles } from 'vtex.css-handles'
import { useQuery } from "react-apollo";

import useProduct from "vtex.product-context/useProduct";

import productReleaseDate from "./queries/productReleaseDate.graphql";

const DEFAULT_TARGET_DATE = new Date("2020-03-02").toISOString();
const CSS_HANDLES = ['countdown']
const Countdown: StorefrontFunctionComponent = () => {

  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const handles = useCssHandles(CSS_HANDLES)
  const productContext = useProduct()
  const product = productContext?.product
  const linkText = product.linkText
  // @ts-ignore
  const { data, loading, error } = useQuery(productReleaseDate, {
    variables: {
      slug: linkText,
    },
    ssr: false,
  });
  console.log({data})

  tick(data?.product?.releaseDate || DEFAULT_TARGET_DATE, setTime)

  if (loading) {
    return <span>Loading...</span>
  }

  if (error) {
    return <span>Erro!</span>
  }


  return (
    <div className={`${handles.countdown} t-heading-2 fw3 w-100 c-muted-1 db tc`}>
      {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
    </div>
  ) 
};

Countdown.schema = {
  title: "editor.countdown.title",
  description: "editor.countdown.description",
  type: "object",
  properties: {
    
  },
};

export default Countdown;
