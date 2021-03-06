import React from 'react'

type Props = {
  htmlAttributes: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headComponents: Array<any>
  bodyAttributes: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  preBodyComponents: Array<any>
  body: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postBodyComponents: Array<any>
}

export default function HTML(props: Props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=800, shrink-to-fit=yes" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}
