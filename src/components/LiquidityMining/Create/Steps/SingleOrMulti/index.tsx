import React, { useCallback } from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'
import { AutoRow } from '../../../../Row'
import { ReactComponent as DiamondSvg } from '../../../../../assets/svg/diamond.svg'
import { ReactComponent as DiamondsSvg } from '../../../../../assets/svg/diamonds.svg'
import { AutoColumn } from '../../../../Column'
import { Card as StyledCard } from '../../../styleds'

const Card = styled(StyledCard)`
  width: 218px;
  height: 138px;
  position: relative;
  opacity: ${props => (!props.selectable || props.active ? '1' : '0.4')};
`

const CardText = styled(Text)`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const Diamond = styled(DiamondSvg)`
  position: absolute;
  right: 0;
  width: 60px;
  path {
    stroke: ${props => props.theme.purple3};
  }
`

const Diamonds = styled(DiamondsSvg)`
  position: absolute;
  right: 0;
  width: 100px;
  path {
    stroke: ${props => props.theme.purple3};
  }
`

interface SingleOrMultiStepProps {
  singleReward: boolean | null
  onChange: (newValue: boolean) => void
}

export default function SingleOrMultiStep({ singleReward, onChange }: SingleOrMultiStepProps) {
  const handleSingleRewardClick = useCallback(() => {
    onChange(true)
  }, [onChange])

  const handleMultiRewardClick = useCallback(() => {
    onChange(false)
  }, [onChange])

  return (
    <AutoRow gap="16px">
      <Card selectable active={singleReward === null || !!singleReward} onClick={handleSingleRewardClick}>
        <AutoColumn>
          <CardText>Single</CardText>
          <CardText>Reward</CardText>
          <CardText>Pool</CardText>
        </AutoColumn>
        <Diamond />
      </Card>
      <Card selectable active={singleReward === null || !singleReward} onClick={handleMultiRewardClick}>
        <AutoColumn>
          <CardText>Multi</CardText>
          <CardText>Reward</CardText>
          <CardText>Pool</CardText>
        </AutoColumn>
        <Diamonds />
      </Card>
    </AutoRow>
  )
}
