import React, { useState } from 'react'
import { HeadProps, Link, PageProps, graphql } from 'gatsby'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import Hero from '../components/hero'
import { Button, Modal, Form } from 'react-bulma-components'
import { calculateTtr } from '../utils/ttr'
import { useLocalStorage } from 'usehooks-ts'
import { FaCalculator } from 'react-icons/fa'
import { firstHalfCompleted } from '../utils/constants'
import { ImageDataLike } from 'gatsby-plugin-image'
import { tableContainer } from '../components/leagueTable.module.scss'

const PlayerPage = ({ data }: PageProps<Queries.PlayerPageQuery>) => {
  const [activeTab, setActiveTab] = useState(
    firstHalfCompleted ? 'secondHalf' : 'firstHalf',
  )
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [myTtr, setMyTtr] = useLocalStorage<null | string>('my-ttr', null)
  const [age, setAge] = useLocalStorage('age', 'option1')
  const [totalBelow30, setTotalBelow30] = useLocalStorage(
    'total-below-30',
    false,
  )
  const [below15AfterOneYear, setBelow15AfterOneYear] = useLocalStorage(
    'below-15-after-one-year',
    false,
  )

  const closeModal = () => {
    setIsOpenModal(false)
  }
  const openModal = () => {
    setIsOpenModal(true)
  }

  const playerScores = data.allPlayerScore.nodes
  // filter scores by first or second half
  const currentLivePz = playerScores.filter(
    score => score?.isSecondHalf === firstHalfCompleted,
  )[0]?.score
  const { winPoints, losePoints, winTtr, loseTtr, winProbability } =
    calculateTtr(
      parseInt(myTtr || '0'),
      currentLivePz || 0,
      age === 'option2',
      age === 'option3',
      totalBelow30,
      below15AfterOneYear,
    )

  const subtitle = (
    <>
      <Link
        className="is-size-6 has-text-inherit"
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
        clubLogo={{
          image: playerScores[0].team?.club?.logo?.image as ImageDataLike,
          size: 'large',
        }}
        subtitle={subtitle}
      ></Hero>

      <section className="section">
        <div className="container">
          <div className="level is-mobile">
            <div className="level-item has-text-centered">
              {currentLivePz && (
                <div>
                  <p className="heading">LivePZ</p>
                  <p className="title">{currentLivePz}</p>
                  <p className="mt-3">
                    <Button
                      size={'small'}
                      title="LivePZ berechnen"
                      onClick={openModal}
                    >
                      <span className="icon">
                        <FaCalculator aria-hidden="true" />
                      </span>
                      <span>LivePZ berechnen</span>
                    </Button>
                  </p>
                </div>
              )}
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Gewonnen</p>
                <p className="title has-text-success mb-5">
                  {data.allPlayerScore.wonTotal ?? '0'}
                </p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Verloren</p>
                <p className="title has-text-danger mb-5">
                  {data.allPlayerScore.lostTotal ?? '0'}
                </p>
              </div>
            </div>
          </div>

          {firstHalfCompleted && (
            <div className="block">
              <div className="tabs is-small is-toggle">
                <ul>
                  <li className={activeTab === 'firstHalf' ? 'is-active' : ''}>
                    <a onClick={() => setActiveTab('firstHalf')}>Hinrunde</a>
                  </li>
                  <li className={activeTab === 'secondHalf' ? 'is-active' : ''}>
                    <a
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
          )}

          <div className="box p-0">
            <div className={`${tableContainer} table-container`}>
              <table className="table is-fullwidth is-narrow is-striped">
                <thead>
                  <tr>
                    <th>Team</th>
                    <th className="has-text-centered">Pos</th>
                    <th className="has-text-centered">Sp</th>
                    <th className="has-text-centered">PK1</th>
                    <th className="has-text-centered">PK2</th>
                    <th className="has-text-centered">Ges</th>
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
                          <td className="is-vcentered">
                            <Link to={`/teams/${score?.team?.id}`}>
                              {score?.team?.name}
                            </Link>
                          </td>
                          <td className="is-vcentered has-text-centered">
                            <span className="has-text-weight-bold">
                              {score?.position}
                            </span>
                          </td>
                          <td className="is-vcentered has-text-centered">
                            {score?.gamesPlayed}
                          </td>
                          <td className="is-vcentered has-text-centered">
                            {score?.pk1Diff?.join(':')}
                          </td>
                          <td className="is-vcentered has-text-centered">
                            {score?.pk2Diff?.join(':')}
                          </td>
                          <td className="is-vcentered has-text-centered">
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
        </div>
      </section>
      <Modal
        show={isOpenModal}
        closeOnEsc={true}
        closeOnBlur={true}
        onClose={closeModal}
      >
        <Modal.Card>
          <Modal.Card.Body>
            <div className="content">
              <h3 className="title is-size-4">LivePZ-Rechner</h3>
              <form className="mb-4">
                <Form.Field kind="group">
                  <Form.Control fullwidth>
                    <Form.Label htmlFor="livepz">LivePZ</Form.Label>
                    <Form.Input
                      id="livepz"
                      value={myTtr || ''}
                      type="number"
                      min="0"
                      max="9999"
                      onChange={e => setMyTtr(e.target.value)}
                    />
                  </Form.Control>
                  <Form.Control>
                    <Form.Label htmlFor="ageInput">Alter</Form.Label>
                    <Form.Select
                      id="ageInput"
                      onChange={e => setAge(e.target.value)}
                      value={age}
                    >
                      <option value="option1">21 oder älter</option>
                      <option value="option2">jünger als 21</option>
                      <option value="option3">jünger als 16</option>
                    </Form.Select>
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Control>
                    <Form.Checkbox
                      checked={below15AfterOneYear}
                      onChange={() =>
                        setBelow15AfterOneYear(!below15AfterOneYear)
                      }
                    >
                      Letztes Spiel liegt mehr als 1 Jahr zurück (bis 15 Spiele)
                    </Form.Checkbox>
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Control>
                    <Form.Checkbox
                      checked={totalBelow30}
                      onChange={() => setTotalBelow30(!totalBelow30)}
                    >
                      Weniger als 30 gespielte Spiele
                    </Form.Checkbox>
                  </Form.Control>
                </Form.Field>
              </form>
              <p>
                Die <strong>Gewinnwahrscheinlichkeit</strong> gegen{' '}
                <strong>
                  {data.player?.name} ({currentLivePz})
                </strong>{' '}
                beträgt:
              </p>
              <div className="level is-mobile mb-3">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="title has-text-success">{winProbability} %</p>
                  </div>
                </div>
              </div>
              <div className="level is-mobile mb-2">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Sieg</p>
                    <p className="title is-size-4 has-text-success">
                      {winTtr} (+{winPoints})
                    </p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Niederlage</p>
                    <p className="title is-size-4 has-text-danger">
                      {loseTtr} ({losePoints})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
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
            logo {
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 64
                    height: 64
                    transformOptions: { fit: CONTAIN }
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
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
