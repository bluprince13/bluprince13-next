import { render } from '@testing-library/react'
import { expectTypeOf } from 'vitest'
import MaterialIcon from '@Components/MaterialIcon'
import type { IconName } from '@Components/MaterialIcon'

it('renders a known icon', () => {
    const { container } = render(<MaterialIcon name="alarm" />)
    expect(container.firstChild).not.toBeNull()
})

it('rejects unknown icon names at the type level', () => {
    expectTypeOf<'not_a_real_icon'>().not.toMatchTypeOf<IconName>()
})
