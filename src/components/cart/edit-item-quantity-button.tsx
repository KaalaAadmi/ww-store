import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
// import { updateItemQuantity } from 'components/cart/actions';
// import LoadingDots from 'components/loading-dots';
// import { CartItem } from 'lib/shopware/types';
// import { useActionState } from "react";
import { useFormStatus } from 'react-dom'
import LoadingDots from '../loading-dots'
import { Cart } from 'payload-types'
// import { UpdateType } from './cart-context';

function SubmitButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: Cart
  type: 'plus' | 'minus'
  optimisticUpdate: (itemId: string, quantity: number) => void
}) {
  const { pending } = useFormStatus()
  const quantity: number = type === 'plus' ? item.quantity + 1 : item.quantity - 1
  const itemId = item.id

  return (
    <button
      type="submit"
      onClick={() => {
        optimisticUpdate(itemId, quantity)
      }}
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      aria-disabled={pending}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'cursor-not-allowed': pending,
          'ml-auto': type === 'minus',
        },
      )}
    >
      {pending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  )
}

type EditItemQuantityButtonProps = {
  item: Cart

  type: 'plus' | 'minus'

  optimisticUpdate: (item: Cart) => void
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: Cart
  type: 'plus' | 'minus'
  optimisticUpdate: (itemId: string, quantity: number) => void
}) {
  //   const [message, formAction] = useActionState(updateItemQuantity, null);
  //   const payload = {
  //     lineId: item.id,
  //     variantId: item.id,
  //     quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
  //   };
  //   const actionWithVariant = formAction.bind(null, payload);

  return (
    <form
    // action={actionWithVariant}
    >
      <SubmitButton item={item} type={type} optimisticUpdate={optimisticUpdate} />
      {/* <p aria-live="polite" className="sr-only" role="status">
        {message || ""}
      </p> */}
    </form>
  )
}
