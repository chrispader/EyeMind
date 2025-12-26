export type Model = {
  id: string
  fileName?: string
  path?: string
  xml?: string
  isMain?: boolean
  groupId?: string
  unclosable?: boolean
  mainTab?: boolean
  file: File
}

export type ValidationResult = {
  isValid: boolean
  error?: string
}

/**
 * Validates that models meet the required criteria:
 * - Exactly one model must be set as main
 * - All models must be assigned to a group
 * - At least one model must exist
 */
export function validateModels(models: Record<string, Model>): ValidationResult {
  const modelValues = Object.values(models ?? {})
  const mainModels = modelValues.filter((model) => model?.isMain === true)

  if (mainModels.length !== 1) {
    return {
      isValid: false,
      error: 'There must be exactly one model set as main',
    }
  }

  if (modelValues.some((model) => (model?.groupId ?? '') === '')) {
    return {
      isValid: false,
      error: 'All models must be assigned to a group',
    }
  }

  if (modelValues.length === 0) {
    return {
      isValid: false,
      error: 'No models to load',
    }
  }

  return { isValid: true }
}

/**
 * Validates models and throws an error if validation fails.
 * Useful when you want to throw instead of returning a result.
 */
export function validateModelsOrThrow(models: Record<string, Model>): void {
  const result = validateModels(models)

  if (!result.isValid) {
    throw new Error(result.error)
  }
}
