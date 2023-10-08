import React, { useState } from 'react'
import { HeadProps, Link, PageProps, graphql } from 'gatsby'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import Hero from '../components/hero'

const PlayerPage = ({ data }: PageProps<Queries.PlayerPageQuery>) => {
  const firstHalfCompleted = false
  const [activeTab, setActiveTab] = useState(
    firstHalfCompleted ? 'secondHalf' : 'firstHalf',
  )

  const playerScores = data.allPlayerScore?.nodes
  const livePz = playerScores && playerScores[0] && playerScores[0].score

  const subtitle = (
    <>
      <Link
        className="is-size-6"
        to={`/clubs/${playerScores[0].team?.club?.id}`}
      >
        {playerScores[0].team?.club?.shortName}
      </Link>
    </>
  )

  return (
    <Layout>
      <Hero
        title={data.player?.name ?? ''}
        showLastUpdated={true}
        subtitle={subtitle}
      ></Hero>

      <section className="section">
        <div className="container">
          <div className="level is-mobile">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">LivePZ</p>
                <p className="title">{livePz}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Gewonnen</p>
                <p className="title">{data.allPlayerScore.wonTotal}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Verloren</p>
                <p className="title">{data.allPlayerScore.lostTotal}</p>
              </div>
            </div>
          </div>
          <div className="block">
            <div className="tabs">
              <ul>
                <li className={activeTab === 'firstHalf' ? 'is-active' : ''}>
                  <a onClick={() => setActiveTab('firstHalf')}>Hinrunde</a>
                </li>
                <li className={activeTab === 'secondHalf' ? 'is-active' : ''}>
                  <a
                    className={activeTab === 'secondHalf' ? 'is-active' : ''}
                    onClick={() =>
                      firstHalfCompleted && setActiveTab('secondHalf')
                    }
                  >
                    Rückrunde
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="table-container u-grow">
            <table className="table is-fullwidth is-narrow is-striped">
              <thead>
                <tr>
                  <th>Mannschaft</th>
                  <th>Position</th>
                  <th>Sp</th>
                  <th>PK 1</th>
                  <th>PK 2</th>
                  <th>Ges</th>
                </tr>
              </thead>
              <tbody>
                {playerScores
                  ?.filter(
                    score =>
                      score?.isSecondHalf === (activeTab === 'secondHalf'),
                  )
                  .map(score => {
                    return (
                      <tr key={score?.team?.id}>
                        <td>
                          <Link to={`/teams/${score?.team?.id}`}>
                            {score?.team?.name}
                          </Link>
                        </td>
                        <td>{score?.position}</td>
                        <td>{score?.gamesPlayed}</td>
                        <td>{score?.pk1Diff?.join(':')}</td>
                        <td>{score?.pk2Diff?.join(':')}</td>
                        <td>
                          {(score?.won || score?.lost) &&
                            [score?.won, score?.lost].join(':')}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const Head = ({ data }: HeadProps<Queries.PlayerPageQuery>) => (
  <SEO title={data.player?.name ?? ''} />
)

export const query = graphql`
  query PlayerPage($playerId: String!) {
    player(id: { eq: $playerId }) {
      id
      name
    }
    allPlayerScore(
      filter: { player: { id: { eq: $playerId } } }
      sort: { position: ASC }
    ) {
      nodes {
        position
        isSecondHalf
        team {
          id
          name
          club {
            id
            shortName
          }
        }
        gamesPlayed
        pk1Diff
        pk2Diff
        won
        lost
        score
      }
      wonTotal: sum(field: { won: SELECT })
      lostTotal: sum(field: { lost: SELECT })
    }
  }
`

export default PlayerPage
