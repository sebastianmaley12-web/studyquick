import { COMMON_MODULE, NINETEEN_EIGHTY_FOUR } from '../../content/english/common-module-1984'
import { MODULE_A, THE_TEMPEST, HAG_SEED } from '../../content/english/module-a-textual-conversations'
import { MODULE_B, ELIOT_POETRY } from '../../content/english/module-b-eliot'
import { type EnglishModule, type EnglishText, lookupById } from './english'

/**
 * Central registry joining every English Advanced module/text content file
 * together, so pages look up content by id (from the URL) instead of each
 * importing a specific text directly. New modules/texts register here and
 * nowhere else needs to change.
 */

export const ENGLISH_MODULES: EnglishModule[] = [COMMON_MODULE, MODULE_A, MODULE_B]
export const ENGLISH_TEXTS: EnglishText[] = [NINETEEN_EIGHTY_FOUR, THE_TEMPEST, HAG_SEED, ELIOT_POETRY]

export function getEnglishModule(moduleId: string): EnglishModule | undefined {
  return lookupById(ENGLISH_MODULES, moduleId)
}

export function getEnglishText(textId: string): EnglishText | undefined {
  return lookupById(ENGLISH_TEXTS, textId)
}

export function textsForModule(moduleId: string): EnglishText[] {
  const module = getEnglishModule(moduleId)
  if (!module) return []
  return module.textIds
    .map((id) => getEnglishText(id))
    .filter((t): t is EnglishText => t !== undefined)
}
