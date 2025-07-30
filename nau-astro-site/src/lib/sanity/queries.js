/**
 * Este archivo centraliza todas las consultas GROQ para el sitio.
 * La estrategia para imágenes es obtener el objeto de imagen completo (`asset->`)
 * para que el componente `SanityImage.astro` pueda construir un `srcset` responsivo.
 */

const imageProjection = `{
  ...,
  asset->
}`;

// Consulta para la página principal de /encuentros
export const paginaEncuentrosQuery = `{
  "page": *[_type == "paginaEncuentros" && !(_id in path("drafts.**"))][0] {
    title,
    seoDescription,
    mainBanner {
      ...,
      "image": image ${imageProjection},
      cta {
        text,
        externalUrl,
        internalLink->{_type, "slug": slug.current}
      }
    },
    introduction,
    ctaBanner {
      ...,
      "image": image ${imageProjection},
      cta {
        text,
        externalUrl,
        internalLink->{_type, "slug": slug.current}
      }
    }
  },
  "encuentros": *[_type == "encuentro" && !(_id in path("drafts.**"))] | order(_createdAt asc) {
    title,
    "slug": slug.current,
    "image": mainImage ${imageProjection},
    "alt": mainImage.alt,
    "description": body
  }
}`;

// Consulta para obtener todos los slugs de los encuentros para getStaticPaths
export const encuentroSlugsQuery = `*[_type == "encuentro" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current }`;

// Consulta para una página de encuentro individual por slug
export const encuentroPorSlugQuery = `*[_type == "encuentro" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  seoDescription,
  "image": mainImage ${imageProjection},
  "description": body
}`;

// Consulta para la página de inicio
export const homePageQuery = `*[_type == "homePage" && !(_id in path("drafts.**"))][0] {
  title,
  seoDescription,
  hero1 {
    ...,
    "image": image ${imageProjection},
    "cta": button {
      text,
      externalUrl,
      internalLink->{_type, "slug": slug.current}
    }
  },
  splitSection1 {
    ...,
    "image": image ${imageProjection}
  },
  hero2 {
    ...,
    "image": image ${imageProjection},
    "cta": button {
      text,
      externalUrl,
      internalLink->{_type, "slug": slug.current}
    }
  },
  featureSection {
    ...,
    feature1 {
      ...,
      "icon": icon.asset->, // Los iconos son pequeños, no necesitan srcset
      link {
        text,
        externalUrl,
        internalLink->{_type, "slug": slug.current}
      }
    },
    feature2 {
      ...,
      "icon": icon.asset->, // Los iconos son pequeños, no necesitan srcset
      link {
        text,
        externalUrl,
        internalLink->{_type, "slug": slug.current}
      }
    }
  },
  splitSection2 {
    ...,
    "image": image ${imageProjection},
    "cta": button {
      text,
      externalUrl,
      internalLink->{_type, "slug": slug.current}
    }
  },
  hero3 {
    ...,
    subheading2, // Agregado para el nuevo párrafo
    "image": image ${imageProjection},
    "cta": button {
      text,
      externalUrl,
      internalLink->{_type, "slug": slug.current}
    }
  }
}`;

// --- Consultas para Simbolismo Numérico ---

// Consulta para la página principal de /simbolismo-numerico
export const paginaSimbolismoNumericoQuery = `{
  "page": *[_type == "paginaSimbolismoNumerico" && !(_id in path("drafts.**"))][0] {
    title,
    seoDescription,
    mainBanner {
      ...,
      tagline,
      "image": image ${imageProjection},
      cta {
        text,
        externalUrl,
        internalLink->{_type, "slug": slug.current}
      }
    },
    introSection {
      body
    },
    bannerWithCards {
      title,
      "backgroundImage": backgroundImage ${imageProjection},
      cards,
      "bottomIcon": bottomIcon ${imageProjection}
    },
    detailedSection {
      title,
      body
    },
    finalSection {
      title,
      body
    },
    ctaBanner {
      ...,
      "image": image ${imageProjection},
      cta {
        text,
        externalUrl,
        internalLink->{_type, "slug": slug.current}
      }
    }
  },
  "servicios": *[_type == "simbolismoNumerico" && !(_id in path("drafts.**"))] | order(order asc) {
    title,
    "slug": slug.current,
    "image": mainImage ${imageProjection},
    "alt": mainImage.alt,
    "description": body
  }
}`;

// Consulta para obtener todos los slugs de los servicios de simbolismo numérico
export const simbolismoNumericoSlugsQuery = `*[_type == "simbolismoNumerico" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current }`;

// Consulta para una página de servicio individual por slug
export const simbolismoNumericoPorSlugQuery = `*[_type == "simbolismoNumerico" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  seoDescription,
  "image": mainImage ${imageProjection},
  "description": body
}`;


// Consulta para la página de Donar
export const paginaDonarQuery = `*[_type == "paginaDonar" && !(_id in path("drafts.**"))][0] {
  title,
  seoDescription,
  hero1 {
    ...,
    "image": image ${imageProjection}
  },
  introduction,
  donationSection {
    ...,
    donationCard1 {
      ...
    },
    donationCard2 {
      ...
    }
  },
  splitSection {
    ...,
    "image": image ${imageProjection}
  },
  hero2 {
    ...,
    "image": image ${imageProjection},
    cta {
      text,
      externalUrl,
      internalLink->{_type, "slug": slug.current}
    }
  }
}`;

// Consulta para la página Sobre NAU
export const paginaSobreNauQuery = `*[_type == "paginaSobreNau" && !(_id in path("drafts.**"))][0] {
  title,
  seoDescription,
  heroBanner1 {
    ...,
    "heroImage1": heroImage1 ${imageProjection},
    "decorativeImage": decorativeImage ${imageProjection},
    cta {
      text,
      externalUrl,
      internalLink->{_type, "slug": slug.current}
    }
  },
  contentSection1,
  contentSection2 {
    ...,
    "contentImage": contentImage ${imageProjection},
    cta {
      text,
      externalUrl,
      internalLink->{_type, "slug": slug.current}
    }
  },
  bannerWithCards {
    ...,
    subtitle,
    "backgroundImage": backgroundImage ${imageProjection}
  },
  contentSection3,
  heroBanner2 {
    ...,
    "heroImage2": heroImage2 ${imageProjection},
    additionalText,
    cta {
      text,
      externalUrl,
      internalLink->{_type, "slug": slug.current}
    }
  }
}`;