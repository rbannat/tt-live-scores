import { graphql, Link } from "gatsby"
import React from "react"
import Hero from "../components/hero"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import { useLocalStorage } from "../hooks/use-local-storage"

// Javascript program to convert Roman
// Numerals to Numberspublic
// This function returns value of
// a Roman symbol
function value(r) {
  if (r === "I") return 1
  if (r === "V") return 5
  if (r === "X") return 10
  if (r === "L") return 50
  if (r === "C") return 100
  if (r === "D") return 500
  if (r === "M") return 1000
  return -1
}

// Finds decimal value of a given
// romal numeral
function romanToDecimal(str) {
  // Initialize result
  let res = 0

  for (let i = 0; i < str.length; i++) {
    // Getting value of symbol s[i]
    let s1 = value(str.charAt(i))

    // Getting value of symbol s[i+1]
    if (i + 1 < str.length) {
      let s2 = value(str.charAt(i + 1))

      // Comparing both values
      if (s1 >= s2) {
        // Value of current symbol
        // is greater or equalto
        // the next symbol
        res = res + s1
      } else {
        // Value of current symbol is
        // less than the next symbol
        res = res + s2 - s1
        i++
      }
    } else {
      res = res + s1
    }
  }
  return res
}

function sortByRomanNumeral(a, b) {
  const romanNumeralRegex =
    / M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/

  const romanNumeralA = a.match(romanNumeralRegex)
    ? a.match(romanNumeralRegex)[0].trim()
    : null
  const romanNumeralB = b.match(romanNumeralRegex)
    ? b.match(romanNumeralRegex)[0].trim()
    : null

  a = romanNumeralA ? romanToDecimal(romanNumeralA) : 0
  b = romanNumeralB ? romanToDecimal(romanNumeralB) : 0

  return a < b ? -1 : 1
}

const ClubPage = ({ data }) => {
  function handleFavClick() {
    if (favoriteClubs?.find(club => club.id === data.club.id)) {
      setFavoriteClubs(prevState =>
        prevState.filter(club => club.id !== data.club.id)
      )
      return
    }
    setFavoriteClubs(prevState => [
      ...new Set([
        ...prevState,
        { id: data.club.id, name: data.club.shortName },
      ]),
    ])
  }
  const groups = data.allTeam.group
  const [favoriteClubs, setFavoriteClubs] = useLocalStorage("fav-clubs", [])

  return (
    <Layout>
      <Hero
        title={data.club.name}
        isFav={favoriteClubs?.find(club => club.id === data.club.id)}
        onFavClick={handleFavClick}
      ></Hero>
      <section className="section">
        <div className="container">
          {groups.map(group => (
            <article key={group.fieldValue} className="panel is-primary">
              <p className="panel-heading">{group.fieldValue}</p>
              {group.nodes
                .sort((teamA, teamB) =>
                  sortByRomanNumeral(teamA.shortName, teamB.shortName)
                )
                .map(team => (
                  <Link
                    key={team.id}
                    className="panel-block"
                    to={`/teams/${team.id}`}
                  >
                    <div>
                      {team.shortName} <br />
                      <span className="is-size-7">{team.league.name}</span>
                    </div>
                  </Link>
                ))}
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const Head = ({ data }) => <SEO title={data.club.name} />

export const query = graphql`
  query ClubPageQuery($clubId: String!) {
    club(id: { eq: $clubId }) {
      id
      name
      shortName
    }
    allTeam(
      sort: [{ league: { name: ASC } }, { shortName: ASC }]
      filter: { club: { id: { eq: $clubId } } }
    ) {
      group(field: { league: { group: { name: SELECT } } }) {
        fieldValue
        nodes {
          id
          name
          shortName
          league {
            name
            group {
              name
            }
          }
        }
      }
    }
  }
`

export default ClubPage
