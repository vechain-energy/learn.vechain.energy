import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Image from 'next/image'
import { useConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <Image src="https://app.vechain.energy/assets/favicon.svg" alt='vechain.energy' width={48} height={48} />,
  logoLink: '/',
  editLink: {
    text: ''
  },
  feedback: {
    useLink: () => 'https://bit.ly/energy-discord'
  },
  docsRepositoryBase: 'https://github.com/vechain-energy',
  chat: {
    link: 'https://bit.ly/energy-discord',
  },
  head: () => {
    const { frontMatter } = useConfig()

    return (
      <>
        <link rel="icon" href="https://app.vechain.energy/assets/favicon.svg" type="image/svg+xml"></link>
        <link rel="icon" href="https://app.vechain.energy/assets/favicon.png" type="image/png"></link>
        <meta property="og:title" content={frontMatter.title || 'vechain.energy'} />
      </>
    )
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – docs.vechain.energy'
    }
  },
  footer: {
    text: 'docs.vechain.energy'
  }
}

export default config
