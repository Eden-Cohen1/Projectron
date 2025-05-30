"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";

import { Request, QueryParam } from "../types";
import { paramTypes } from "../constants";
import { PathParams } from "./path-params";
import { JsonDisplay } from "./json-display";

// Mobile-friendly query parameter item
function QueryParamCard({
  param,
  onEdit,
  onDelete,
}: {
  param: QueryParam;
  onEdit?: (param: QueryParam) => void;
  onDelete?: () => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [editedParam, setEditedParam] = useState<QueryParam>({ ...param });

  // Save changes and exit edit mode
  const saveChanges = () => {
    if (onEdit) {
      onEdit(editedParam);
    }
    setEditMode(false);
  };

  // Cancel editing and reset to original values
  const cancelEdit = () => {
    setEditedParam({ ...param });
    setEditMode(false);
  };

  if (!editMode) {
    return (
      <div className="bg-primary-background rounded-md border border-divider hover:border-primary-cta/30 transition-colors p-2.5">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-primary-text text-sm">
            {param.name}
          </h4>
          <div className="flex items-center -mr-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-secondary-text hover:text-primary-cta"
              onClick={() => setEditMode(true)}
            >
              <Edit className="h-3 w-3" />
            </Button>
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-secondary-text hover:text-red-400"
                onClick={onDelete}
              >
                <Trash2 className="h-3 w-3 " />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mt-1.5 mb-1">
          <code className="bg-hover-active/30 px-1.5 py-0.5 rounded text-xs text-secondary-text">
            {param.type}
          </code>
          {param.required ? (
            <Badge
              variant="outline"
              className="bg-amber-600/10 text-amber-400 border-amber-600/20 text-xs px-1.5 py-0 h-5"
            >
              Required
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-blue-600/10 text-blue-400 border-blue-600/20 text-xs px-1.5 py-0 h-5"
            >
              Optional
            </Badge>
          )}
        </div>

        {param.description && (
          <p className="text-secondary-text text-xs leading-tight mt-1">
            {param.description}
          </p>
        )}
      </div>
    );
  }

  // Edit mode - more compact and elegant
  return (
    <div className="bg-hover-active/5 rounded-md border border-primary-cta/30 p-3 space-y-2.5 transition-all">
      <div>
        <Label
          htmlFor="param-name"
          className="text-xs mb-1 block text-secondary-text"
        >
          Parameter Name
        </Label>
        <Input
          id="param-name"
          value={editedParam.name}
          onChange={(e) =>
            setEditedParam({ ...editedParam, name: e.target.value })
          }
          className="h-7 bg-primary-background text-sm"
        />
      </div>

      <div>
        <Label
          htmlFor="param-type"
          className="text-xs mb-1 block text-secondary-text"
        >
          Type
        </Label>
        <Select
          value={editedParam.type}
          onValueChange={(value) =>
            setEditedParam({ ...editedParam, type: value })
          }
        >
          <SelectTrigger
            id="param-type"
            className="h-7 bg-primary-background text-sm"
          >
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {paramTypes.map((type) => (
              <SelectItem key={type} value={type} className="text-sm">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label
          htmlFor="param-description"
          className="text-xs mb-1 block text-secondary-text"
        >
          Description
        </Label>
        <Textarea
          id="param-description"
          value={editedParam.description}
          onChange={(e) =>
            setEditedParam({
              ...editedParam,
              description: e.target.value,
            })
          }
          placeholder="What does this parameter do?"
          rows={2}
          className="resize-none bg-primary-background text-sm min-h-[60px]"
        />
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          <Checkbox
            id="param-required"
            checked={editedParam.required}
            onCheckedChange={(checked) =>
              setEditedParam({
                ...editedParam,
                required: checked === true,
              })
            }
            className="h-3.5 w-3.5"
          />
          <Label htmlFor="param-required" className="text-xs">
            Required
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs px-2.5"
            onClick={cancelEdit}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            size="sm"
            className="h-7 text-xs px-2.5"
            onClick={saveChanges}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

// Mobile card list for query parameters with improved grid layout
function MobileQueryParamsList({
  params,
  onEdit,
  onDelete,
}: {
  params: QueryParam[];
  onEdit?: (index: number, param: QueryParam) => void;
  onDelete?: (index: number) => void;
}) {
  // Add safety check for undefined/null params
  const safeParams = params || [];

  if (safeParams.length === 0) {
    return null;
  }

  return (
    <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-2">
      {safeParams.map((param, idx) => (
        <QueryParamCard
          key={idx}
          param={param}
          onEdit={(updatedParam) => onEdit && onEdit(idx, updatedParam)}
          onDelete={() => onDelete && onDelete(idx)}
        />
      ))}
    </div>
  );
}

// Desktop table for query parameters
function DesktopQueryParamsTable({
  params,
  onEdit,
  onDelete,
}: {
  params: QueryParam[];
  onEdit?: (index: number, param: QueryParam) => void;
  onDelete?: (index: number) => void;
}) {
  // Add safety check for undefined/null params
  const safeParams = params || [];

  if (safeParams.length === 0) {
    return null;
  }

  return (
    <div className="hidden md:block rounded-md border border-divider overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-hover-active border-b border-divider">
          <tr>
            <th className="px-4 py-2 text-left text-secondary-text">Name</th>
            <th className="px-4 py-2 text-left text-secondary-text">Type</th>
            <th className="px-4 py-2 text-left text-secondary-text">
              Required
            </th>
            <th className="px-4 py-2 text-left text-secondary-text">
              Description
            </th>
            <th className="px-4 py-2 w-24"></th>
          </tr>
        </thead>
        <tbody>
          {safeParams.map((param, idx) => (
            <QueryParamTableRow
              key={idx}
              param={param}
              onEdit={(updatedParam) => onEdit && onEdit(idx, updatedParam)}
              onDelete={() => onDelete && onDelete(idx)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Query parameter table row component
function QueryParamTableRow({
  param,
  onEdit,
  onDelete,
}: {
  param: QueryParam;
  onEdit?: (param: QueryParam) => void;
  onDelete?: () => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [editedParam, setEditedParam] = useState<QueryParam>({ ...param });

  const saveChanges = () => {
    if (onEdit) {
      onEdit(editedParam);
    }
    setEditMode(false);
  };

  const cancelEdit = () => {
    setEditedParam({ ...param });
    setEditMode(false);
  };

  if (!editMode) {
    return (
      <tr className="border-b border-divider last:border-0">
        <td className="px-4 py-2 font-medium text-primary-text">
          {param.name}
        </td>
        <td className="px-4 py-2 text-secondary-text">
          <code className="bg-hover-active/40 px-1.5 py-0.5 rounded text-xs">
            {param.type}
          </code>
        </td>
        <td className="px-4 py-2">
          {param.required ? (
            <Badge
              variant="outline"
              className="bg-amber-600/20 text-amber-400 border-0"
            >
              Required
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-blue-600/20 text-blue-400 border-0"
            >
              Optional
            </Badge>
          )}
        </td>
        <td className="px-4 py-2 text-secondary-text">{param.description}</td>
        <td className="px-4 py-2 text-right">
          <div className="flex items-center justify-end gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setEditMode(true)}
            >
              <Edit className="h-3.5 w-3.5 text-secondary-text" />
            </Button>
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:text-red-400"
                onClick={onDelete}
              >
                <Trash2 className="h-3.5 w-3.5 text-secondary-text" />
              </Button>
            )}
          </div>
        </td>
      </tr>
    );
  }

  // Edit mode
  return (
    <tr className="border-b border-divider last:border-0 bg-hover-active/10">
      <td colSpan={5} className="p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <Label htmlFor="param-name" className="text-xs mb-1 block">
              Parameter Name
            </Label>
            <Input
              id="param-name"
              value={editedParam.name}
              onChange={(e) =>
                setEditedParam({ ...editedParam, name: e.target.value })
              }
              className="h-8 bg-primary-background w-full"
            />
          </div>
          <div>
            <Label htmlFor="param-type" className="text-xs mb-1 block">
              Type
            </Label>
            <Select
              value={editedParam.type}
              onValueChange={(value) =>
                setEditedParam({ ...editedParam, type: value })
              }
            >
              <SelectTrigger
                id="param-type"
                className="h-8 bg-primary-background w-full"
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {paramTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-3">
          <Label htmlFor="param-description" className="text-xs mb-1 block">
            Description
          </Label>
          <Textarea
            id="param-description"
            value={editedParam.description}
            onChange={(e) =>
              setEditedParam({
                ...editedParam,
                description: e.target.value,
              })
            }
            rows={2}
            className="resize-none bg-primary-background w-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-2">
            <Checkbox
              id="param-required"
              checked={editedParam.required}
              onCheckedChange={(checked) =>
                setEditedParam({
                  ...editedParam,
                  required: checked === true,
                })
              }
            />
            <Label htmlFor="param-required" className="text-sm">
              Required
            </Label>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              className="h-7"
              onClick={cancelEdit}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              className="h-7"
              onClick={saveChanges}
            >
              Save
            </Button>
          </div>
        </div>
      </td>
    </tr>
  );
}

interface RequestSectionProps {
  request: Request;
  path: string;
  onUpdateRequest?: (updatedRequest: Request) => void;
}

export function RequestSection({
  request,
  path,
  onUpdateRequest,
}: RequestSectionProps) {
  const [addingParam, setAddingParam] = useState(false);
  const [newParam, setNewParam] = useState<QueryParam>({
    name: "",
    type: "string",
    required: false,
    description: "",
  });

  // Safe access to query_params with default empty array
  const queryParams = request.query_params || [];
  const hasExistingParams = queryParams.length > 0;

  // Handle parameter update
  const handleParamUpdate = (index: number, updatedParam: QueryParam) => {
    if (!onUpdateRequest) return;

    const newParams = [...queryParams];
    newParams[index] = updatedParam;

    onUpdateRequest({
      ...request,
      query_params: newParams,
    });
  };

  // Handle parameter deletion
  const handleParamDelete = (index: number) => {
    if (!onUpdateRequest) return;

    const newParams = [...queryParams];
    newParams.splice(index, 1);

    onUpdateRequest({
      ...request,
      query_params: newParams,
    });
  };

  // Add new parameter - using safe queryParams variable
  const addParam = () => {
    if (!onUpdateRequest || newParam.name.trim() === "") return;

    onUpdateRequest({
      ...request,
      query_params: [...queryParams, newParam], // Use safe queryParams instead of request.query_params
    });

    setNewParam({
      name: "",
      type: "string",
      required: false,
      description: "",
    });

    setAddingParam(false);
  };

  // Handle request body update
  const handleBodyUpdate = (schemaData: Record<string, any>) => {
    if (!onUpdateRequest || !request.body) return;

    onUpdateRequest({
      ...request,
      body: {
        ...request.body,
        schema_data: schemaData,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Path Parameters */}
      <PathParams path={path} />

      {/* Query Parameters */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-md font-medium text-secondary-text">
            Query Parameters
          </h4>
          {!addingParam && (
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-cta"
              onClick={() => setAddingParam(true)}
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Parameter
            </Button>
          )}
        </div>

        {hasExistingParams || addingParam ? (
          <>
            {/* Desktop Table View - only show if there are existing params */}
            {hasExistingParams && (
              <DesktopQueryParamsTable
                params={queryParams}
                onEdit={handleParamUpdate}
                onDelete={handleParamDelete}
              />
            )}

            {/* Mobile Card List View - only show if there are existing params */}
            {hasExistingParams && (
              <MobileQueryParamsList
                params={queryParams}
                onEdit={handleParamUpdate}
                onDelete={handleParamDelete}
              />
            )}

            {/* New parameter form */}
            {addingParam && (
              <div className="mt-2 bg-hover-active/10 rounded-md border border-divider p-3 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label
                      htmlFor="new-param-name"
                      className="text-xs mb-1 block"
                    >
                      Parameter Name
                    </Label>
                    <Input
                      id="new-param-name"
                      value={newParam.name}
                      onChange={(e) =>
                        setNewParam({
                          ...newParam,
                          name: e.target.value,
                        })
                      }
                      className="h-8 bg-primary-background w-full"
                      placeholder="e.g., page, limit"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="new-param-type"
                      className="text-xs mb-1 block"
                    >
                      Type
                    </Label>
                    <Select
                      value={newParam.type}
                      onValueChange={(value) =>
                        setNewParam({ ...newParam, type: value })
                      }
                    >
                      <SelectTrigger
                        id="new-param-type"
                        className="h-8 bg-primary-background w-full"
                      >
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {paramTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="new-param-description"
                    className="text-xs mb-1 block"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="new-param-description"
                    value={newParam.description}
                    onChange={(e) =>
                      setNewParam({
                        ...newParam,
                        description: e.target.value,
                      })
                    }
                    rows={2}
                    className="resize-none bg-primary-background w-full"
                    placeholder="What does this parameter do?"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="new-param-required"
                      checked={newParam.required}
                      onCheckedChange={(checked) =>
                        setNewParam({
                          ...newParam,
                          required: checked === true,
                        })
                      }
                    />
                    <Label htmlFor="new-param-required" className="text-sm">
                      Required
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7"
                      onClick={() => setAddingParam(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="h-7"
                      onClick={addParam}
                      disabled={!newParam.name.trim()}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-md border border-divider p-3 text-center text-secondary-text">
            No query parameters defined
          </div>
        )}
      </div>

      {/* Request Body */}
      <div>
        <h4 className="text-md font-medium mb-2 text-secondary-text">
          Request Body
        </h4>
        <div className="space-y-2">
          {request.body ? (
            <>
              <div className="flex gap-2 items-center">
                <Badge
                  variant="outline"
                  className="bg-hover-active text-primary-text border-divider"
                >
                  {request.body.type}
                </Badge>
              </div>
              <JsonDisplay
                data={request.body.schema_data}
                maxHeight="96"
                editable={true}
                onEdit={handleBodyUpdate}
              />
            </>
          ) : (
            <div className="rounded-md border border-divider p-4 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!onUpdateRequest) return;
                  onUpdateRequest({
                    ...request,
                    body: {
                      type: "application/json",
                      schema_data: {},
                    },
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Request Body
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
