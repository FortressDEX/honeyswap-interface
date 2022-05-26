import { useEffect } from 'react'
import { useActiveWeb3React } from '../../hooks'
import { setSwapFees, setProtocolFee } from './actions'
import { useDispatch } from 'react-redux'
import { Fetcher } from 'dxswap-sdk'

export default function Updater() {
  const { library, chainId } = useActiveWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    if (library && chainId) {
      const fetchData = async () => {
        try {
          const [swapFees, protocolFee] = await Promise.all([Fetcher.fetchAllSwapFees(chainId, {}, library), Fetcher.fetchProtocolFee(chainId, library)]);
          if (swapFees) dispatch(setSwapFees({ swapFees }))
          if (protocolFee)
            dispatch(
              setProtocolFee({
                protocolFeeDenominator: Number(protocolFee.feeDenominator) + 1,
                protocolFeeTo: protocolFee.feeReceiver
              })
            )
        } catch(e) {
          console.warn('Cancelled fetch for fees, error:', e);
        }
      };

      fetchData().catch(error => {
          console.error('Cancelled fetch for fees, error:', error)
          return
      })
    }
    
  }, [library, chainId, dispatch])

  return null
}
