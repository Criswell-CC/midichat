import Piano from '@/components/ui/elements/Piano'

describe('Piano component', () => {

  it('mounts piano component', () => {
    cy.mount(<Piano startKey='A' endKey="C" octaves={4} />)
  })

})