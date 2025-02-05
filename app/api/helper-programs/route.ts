import { NextResponse } from 'next/server'
import { createProgramEmbedding } from '@/utils/vectorutils'
import { storeHelperProgramWithEmbedding, retrieveFromIPFS } from '@/utils/ipfsUtils'
import { HelperProgram, CreateHelperProgramInput, UpdateHelperProgramInput } from '@/types/helperProgram'

// In-memory storage with proper typing
let helperPrograms: HelperProgram[] = []

export async function POST(request: Request) {
  try {
    const body: CreateHelperProgramInput = await request.json()
    
    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    // Create a new helper program object with proper typing
    const newProgram: Omit<HelperProgram, 'ipfsHash'> = {
      id: crypto.randomUUID(),
      title: body.title,
      description: body.description,
      requirements: body.requirements || '',
      location: body.location || 'Remote',
      duration: body.duration || 'Flexible',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    try {
      // Create embedding for the program
      const programText = `${newProgram.title} ${newProgram.description} ${newProgram.requirements}`
      const embedding = await createProgramEmbedding(programText)
      // Convert newProgram to a string representation for IPFS storage
      const programString = JSON.stringify(newProgram)
      // Store program and embedding in IPFS
      const ipfsHash = await storeHelperProgramWithEmbedding(programString, embedding)
      
      // Create the final program object with IPFS hash
      const finalProgram: HelperProgram = {
        ...newProgram,
        ipfsHash
      }
      
      // Store in memory
      helperPrograms.push(finalProgram)

      return NextResponse.json({
        message: 'Helper program created successfully',
        program: finalProgram
      }, { status: 201 })

    } catch (error) {
      console.error('Error processing helper program:', error)
      return NextResponse.json(
        { error: 'Failed to process helper program' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error creating helper program:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as HelperProgram['status'] | null
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')

    let filteredPrograms = [...helperPrograms]
    if (status) {
      filteredPrograms = filteredPrograms.filter(program => program.status === status)
    }

    filteredPrograms.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPrograms = filteredPrograms.slice(startIndex, endIndex)

    const total = filteredPrograms.length
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      programs: paginatedPrograms,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit
      }
    })

  } catch (error) {
    console.error('Error fetching helper programs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body: UpdateHelperProgramInput = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Program ID is required' },
        { status: 400 }
      )
    }

    const programIndex = helperPrograms.findIndex(p => p.id === id)
    if (programIndex === -1) {
      return NextResponse.json(
        { error: 'Helper program not found' },
        { status: 404 }
      )
    }

    const updatedProgram: HelperProgram = {
      ...helperPrograms[programIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    if (updates.title || updates.description || updates.requirements) {
      const programText = `${updatedProgram.title} ${updatedProgram.description} ${updatedProgram.requirements}`
      const embedding = await createProgramEmbedding(programText)
      const ipfsHash = await storeHelperProgramWithEmbedding(programText, embedding)
      updatedProgram.ipfsHash = ipfsHash
    }

    helperPrograms[programIndex] = updatedProgram

    return NextResponse.json({
      message: 'Helper program updated successfully',
      program: updatedProgram
    })

  } catch (error) {
    console.error('Error updating helper program:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Program ID is required' },
        { status: 400 }
      )
    }

    const programIndex = helperPrograms.findIndex(p => p.id === id)
    if (programIndex === -1) {
      return NextResponse.json(
        { error: 'Helper program not found' },
        { status: 404 }
      )
    }

    helperPrograms = helperPrograms.filter(p => p.id !== id)

    return NextResponse.json({
      message: 'Helper program deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting helper program:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}