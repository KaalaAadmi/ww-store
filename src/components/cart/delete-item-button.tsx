'use client'

// import { CartItems } from "@/types";
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Cart } from 'payload-types'
// import { removeItem } from 'components/cart/actions';
// import { CartItem } from 'lib/shopware/types';
import { useActionState } from 'react'

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: Cart
  // optimisticUpdate: (merchandiseId: string, action: 'delete') => void
  optimisticUpdate: (item: Cart) => void
}) {
  //   const [message, formAction] = useActionState(removeItem, null);
  const merchandiseId = item.id
  //   const actionWithVariant = formAction.bind(null, merchandiseId);

  return (
    <form
    //   action={async () => {
    //     optimisticUpdate(merchandiseId, 'delete');
    //     await actionWithVariant();
    //   }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
        onClick={() => optimisticUpdate(item)}
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
      {/* <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p> */}
    </form>
  )
}