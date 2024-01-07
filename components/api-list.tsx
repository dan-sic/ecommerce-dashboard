import { FC } from "react"

import { ApiAlert } from "./api-alert"

interface ApiListProps {
  entitityName: {
    plural: string
    singular: string
  }
  storeId: string
}

export const ApiList: FC<ApiListProps> = ({ entitityName, storeId }) => {
  return (
    <div className="space-y-3">
      <ApiAlert
        title="GET"
        description={`${process.env.NEXT_PUBLIC_APP_URL}/api/stores/${storeId}/${entitityName.plural}`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${
          process.env.NEXT_PUBLIC_APP_URL
        }/api/stores/${storeId}/${entitityName.plural}/{${
          entitityName.singular + "Id"
        }}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        description={`${process.env.NEXT_PUBLIC_APP_URL}/api/stores/${storeId}/${entitityName.plural}`}
        variant="admin"
      />
      <ApiAlert
        title="PUT"
        description={`${
          process.env.NEXT_PUBLIC_APP_URL
        }/api/stores/${storeId}/${entitityName.plural}/{${
          entitityName.singular + "Id"
        }}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${
          process.env.NEXT_PUBLIC_APP_URL
        }/api/stores/${storeId}/${entitityName.plural}/{${
          entitityName.singular + "Id"
        }}`}
        variant="admin"
      />
    </div>
  )
}
